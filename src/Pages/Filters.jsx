import { Listbox, Transition } from "@headlessui/react";
import React, { useState, useEffect, Fragment } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import Axios from 'axios'

const YearData = [
  { title: "All Year" },
  { title: "2023" },
  { title: "2022" },
  { title: "2024" },
];

const TimesData = [
  { title: "All Months" },
  { title: "January" },
  { title: "February" },
  { title: "March" },
  { title: "April" },
  { title: "May" },
  { title: "June" },
  { title: "July" },
  { title: "August" },
  { title: "September" },
  { title: "October" },
  { title: "November" },
  { title: "December" },
];

const RatesData = [
  { title: "All Rates" },
  { title: "1 Star" },
  { title: "2 Star" },
  { title: "3 Star" },
  { title: "4 Star" },
  { title: "5 Star" },
];

function Filters({searchField}) {
  const [category, setCategory] = useState({ id: 0, title: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);

  const [data, setData] = useState([])
  const [error, setError] = useState(null);

  function createError(phrase) {
    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full" role="alert">
        <p>{phrase}</p>
    </div>
  }

  function updateSearch() {
    const searchFieldDATA = {
      category: category.title,
      year: year,
      times: times,
      rates: rates.title
    }
    searchField(searchFieldDATA)
  }

  useEffect(() => {
    updateSearch()
  }, [category, year, times, rates])

  useEffect(() => {
    Axios.get('https://cheatsheet-mysql.herokuapp.com/getAllCategories')
    .then((response) => {
        if (response.data === false) {
            const temp = createError("Connection failed")
            setError(temp)
        } else {
            const temp = response.data
            temp.unshift({ id: 0, title: "All Categories" })
            setData(temp)
        }
    }).catch(err => setError(createError(err)))
  }, [])

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items: data,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: times,
      onChange: setTimes,
      items: TimesData,
    },
    {
      value: rates,
      onChange: setRates,
      items: RatesData,
    },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {error}
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <FaAngleDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((iterm, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={iterm}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {iterm.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
}

export default Filters;
