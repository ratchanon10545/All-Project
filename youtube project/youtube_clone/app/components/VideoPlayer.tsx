export default function VideoPlayer() {
    return (
      <section className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h1 className="text-xl font-semibold mb-4">Video Title</h1>
        <video controls className="w-full bg-black rounded-md">
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    );
  }
  