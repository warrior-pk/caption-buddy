import {
  StartTranscriptionJobCommand,
  TranscribeClient,
  GetTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";

function getClient() {
  const transcribeCilent = new TranscribeClient({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  return transcribeCilent;
}

function createTranscriptionCommand(filename) {
  const transcriptionCommand = new StartTranscriptionJobCommand({
    TranscriptionJobName: filename,
    OutputBucketName: process.env.BUCKET_NAME,
    OutputKey: filename + ".transcription",
    IdentifyLanguage: true,
    Media: {
      MediaFileUri: "s3://" + process.env.BUCKET_NAME + "/" + filename,
    },
  });
  return transcriptionCommand;
}

async function createTranscriptionJob(filename) {
  const transcribeClient = getClient();
  const transcriptionCommand = createTranscriptionCommand(filename);
  return transcribeClient.send(transcriptionCommand);
}

async function getJob(filename) {
  const transcribeClient = getClient();
  try {
    const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
      TranscriptionJobName: filename,
    });
    const jobStatusResult = await transcribeClient.send(
      transcriptionJobStatusCommand
    );
    return jobStatusResult;
  } catch (e) {
    return null;
  }
}
export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const filename = searchParams.get("filename");

  const existingJob = await getJob(filename);

  if (!existingJob) {
    console.log("Called Job", existingJob);
    const newJob = await createTranscriptionJob(filename);
    return Response.json({
      status: newJob.TranscriptionJob.TranscriptionJobStatus,
    });
  } else {
    console.log("Existing Job", existingJob);
    return Response.json({
      status: existingJob.TranscriptionJob.TranscriptionJobStatus,
    });
  }

  return Response.json(res);
}
