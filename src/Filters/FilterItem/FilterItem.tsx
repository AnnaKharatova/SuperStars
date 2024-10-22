import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./FilterItem.scss";
import arrowDown from "../../assets/icons/arrow-down.svg";
import arrowUp from "../../assets/icons/arrow-up.svg";
import { IFilter } from "../../utils/types";

interface IProps {
  filter: string;
  itemsList: IFilter[];
  filterMark: string[];
  setFilterMark: (filterMark: string[]) => void;
  selectedIdList: number[];
  setSelectedIdList: (id: number[]) => void;
}
const FilterItem: React.FC<IProps> = ({
  itemsList,
  filter,
  filterMark,
  setFilterMark,
  selectedIdList,
  setSelectedIdList,
}) => {
  const [filterListOpen, setFilterListOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [filteredList, setFilteredList] = useState<IFilter[]>([]);

  function createArrays(items: IFilter[]) {
    const allFilters = items.map((item) => item.id);
    const allFilteraName = items.map((item) => item.name);
    return [allFilters, allFilteraName];
  }

  const [allFilters, allFilteraName] = createArrays(itemsList);

  useEffect(() => {
    setFilteredList(itemsList);
  }, []);

  const handleInputChange = (event: any) => {
    const searchValue = event.target.value.toLowerCase();
    const results = itemsList.filter((item) =>
      item.name.toLowerCase().startsWith(searchValue),
    );
    setFilteredList(results);
  };

  const handleСheckboxChange = (event: any) => {
    const { value, checked, name } = event.target;

    if (checked) {
      setSelectedIdList([...selectedIdList, value]);
      if (filterMark.includes(name)) {
        setFilterMark(filterMark.filter((item) => item !== name));
      } else {
        setFilterMark([...filterMark, name]);
      }
    } else {
      setSelectedIdList(selectedIdList.filter((part) => part !== value));
      setFilterMark(filterMark.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setFilterListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  function handleFilterOpen() {
    setFilterListOpen(!filterListOpen);
  }

  function handleAllFilters(event: any) {
    const { name, checked } = event.target;
    if (name === allFilteraName.toString()) {
      setFilterMark(checked ? filteredList.map((item) => item.name) : []);
    } else {
      if (checked) {
        setFilterMark([...filterMark, name]);
      } else {
        setFilterMark(filterMark.filter((item) => item !== name));
      }
      if (filteredList.every((item) => filterMark.includes(item.name))) {
        setFilterMark(filteredList.map((item) => item.name));
      } else {
        setFilterMark(
          filterMark.filter((item) => item !== allFilteraName.toString()),
        );
      }
    }
  }

  return (
    <div ref={popupRef} className="filter-item">
      <button
        className={
          !filterListOpen
            ? "filter-item__button"
            : "filter-item__button filter-item__button_open"
        }
        onClick={handleFilterOpen}
      >
        {filter}
        <img
          className="filter-item__button-logo"
          src={!filterListOpen ? arrowDown : arrowUp}
        />
      </button>
      {
        <div
          ref={popupRef}
          className="filter-item__container"
          style={{ display: !filterListOpen ? "none" : "block" }}
        >
          <input
            className="filter-item__input"
            type="input"
            placeholder="Найти"
            onChange={handleInputChange}
          />
          <ul className="filter-item__list">
            {filteredList.length > 0 ? (
              <>
                <li className="filter-item__list-item">
                  <input
                    className="filter-item__ckeckbox"
                    type="checkbox"
                    onChange={handleAllFilters}
                    id="all"
                    name={allFilteraName.toString()}
                    value={allFilters.toString()}
                  />
                  <label className="filter-item__label" htmlFor="all">
                    Все
                  </label>
                </li>
                {filteredList.map((item) => (
                  <li key={uuidv4()} className="filter-item__list-item">
                    <input
                      className="filter-item__ckeckbox"
                      type="checkbox"
                      checked={filterMark.includes(item.name)}
                      onChange={handleСheckboxChange}
                      name={item.name}
                      value={item.id}
                      id={item.name.toString().toLowerCase()}
                    />
                    <label
                      className="filter-item__label"
                      htmlFor={item.name.toString().toLowerCase()}
                    >
                      {item.name}
                    </label>
                  </li>
                ))}
              </>
            ) : (
              <div className="filter-item__label">Здесь ничего нет</div>
            )}
          </ul>
        </div>
      }
    </div>
  );
};

export default FilterItem;
