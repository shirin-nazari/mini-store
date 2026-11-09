const OurMission = () => {
  return (
    <section className="mx-auto mt-6 max-w-7xl overflow-hidden rounded-xl my-10">
      <div className="flex flex-col md:flex-row items-center gap-8 md:justify-around px-4 py-8 md:px-0">
        <div className="z-10 w-full md:w-1/2 mx-auto px-2">
          <h2 className="text-xl font-bold text-red-950 mb-5">Our Mission</h2>
          <p className="text-sm text-gray-600 font-semibold max-w-md leading-5">
            Our goal is to create a shopping experience where finding the right
            product feels effortless. We bring useful products and a simple,
            user-friendly experience together in one place.
          </p>
        </div>
        <div className="flex w-full justify-center rounded-xl bg-red-950/20 backdrop-blur-md md:w-1/2">
          <img
            src="/support.webp"
            alt="supported"
            className="aspect-square w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default OurMission;
