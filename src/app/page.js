import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center gap-4 mb-4 py-4">
        <h1 className="text-3xl md:text-5xl">Add Captions to your video!</h1>
        <h2 className="text-2xl md:text-3xl">with Caption Buddy</h2>
        <UploadForm />
      </section>
      <section className="flex flex-wrap-reverse justify-around">
        <div className="bg-lime-100/50 p-8 aspect-[3/4] h-[30rem] order-1">
          1
        </div>
        {/* <div className="convert px-4 flex items-center justify-center order-2">
          2
        </div> */}
        <div className="bg-lime-100/50 p-8 aspect-[3/4] h-[30rem] order-3">
          3
        </div>
      </section>
    </div>
  );
}
