"use client";
import { useState } from "react";
type SellForm = {
  name: string;
  businessName: string;
  whopUrl: string;
  email: string;
  date: string;
  time: string;
};
const Page = () => {
  const today = new Date();
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Calculate date 6 weeks from today
  const sixWeeksFromNow = new Date(today);
  sixWeeksFromNow.setDate(today.getDate() + 42);
  // calculate Time GMT +5
  const convertToGMT5 = (localTime: string, localDate: string) => {
    const localDateTime = new Date(`${localDate}T${localTime}:00`);
    const offset = localDateTime.getTimezoneOffset(); 
    const gmt5Offset = 5 * 60; 
    const totalOffset = offset + gmt5Offset;  
    const gmt5Date = new Date(localDateTime.getTime() + totalOffset * 60000);
    return gmt5Date.toTimeString().slice(0, 5); 
  };

  const [formData, setFormData] = useState<SellForm>({
    name: "",
    businessName: "",
    whopUrl: "",
    email: "",
    date: "",
    time: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTime = convertToGMT5(formData.time , formData.date)
    setFormData({...formData,time:newTime})
    setFormData({
      businessName: "",
      date: "",
      email: "",
      name: "",
      time: "",
      whopUrl: "",
    });
    setShowAlert(true);
  };

  return (
    <div className="max-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-8 py-6 border-[1px] border-gray-200 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Booking Form
          </h2> 
          {showAlert && (
            <h1 className="text-center w-full bg-green-300 py-[5px] rounded-[5px] mb-[15px]">
              Thanks for Booking.. we will receive it{" "}
            </h1>
          )}
          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* Name Field */}

            <div className="flex gap-[20px]">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
                    {/* <User className="h-5 w-5 text-gray-400" /> */}
                  </div>
                  <input
                    type="text"
                    id="name"
                    required
                    className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Business Name Field */}
              <div >
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <Building className="h-5 w-5 text-gray-400" /> */}
                  </div>
                  <input
                    type="text"
                    id="businessName"
                    required
                    className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Company Inc."
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Whop URL Field */}
            <div>
              <label
                htmlFor="whopUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Whop URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <Link className="h-5 w-5 text-gray-400" /> */}
                </div>
                <input
                  type="url"
                  id="whopUrl"
                  required
                  // pattern="https?://.*whop\.com.*"
                  className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://whop.com/your-business"
                  value={formData.whopUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, whopUrl: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <Mail className="h-5 w-5 text-gray-400" /> */}
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>



            {/* Date Field */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <Calendar className="h-5 w-5 text-gray-400" /> */}
                </div>
                <input
                  type="date"
                  id="date"
                  required
                  min={formatDate(today)}
                  max={formatDate(sixWeeksFromNow)}
                  className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Time Field (GMT+5) */}
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time (GMT+5)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <Clock className="h-5 w-5 text-gray-400" /> */}
                </div>
                <input
                  type="time"
                  id="time"
                  required
                  className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                All times are in GMT+5
              </p>
            </div>


            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Page;
