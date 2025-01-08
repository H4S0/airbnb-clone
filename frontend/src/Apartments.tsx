const Apartments = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-40">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-2">It's really easy</h2>
        <h2 className="text-3xl font-bold mb-2">to post something on</h2>
        <h2 className="text-4xl font-extrabold text-red-700">Airbnb</h2>
      </div>

      <div className="space-y-10">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            className="flex items-start gap-6 p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-center w-12 h-12 text-white bg-red-700 rounded-full font-bold text-xl">
              {number}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Recite nam nešto o svome smještaju
              </h2>
              <p className="text-gray-600">
                Navedite nekoliko osnovnih informacija, kao što su lokacija
                smještaja i koliko gostiju može u njemu boraviti.12f3
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartments;
