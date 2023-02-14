import React from 'react';
import { FilterItem } from './FilterItem';

export enum FilterType {
  region = 0,
  category = 1,
  time = 2,
  typeData = 3,
}
interface Props {
  data: {
    id: FilterType;
    data: string[];
  }[];
  selectedRegion: string;
  selectedCategory: string;
  selectedTime: string;
  selectedOrder: string;
  onFilterSelected: (id: FilterType, value: string) => void;
}

const getSelectedDataById = (id: FilterType, data: string[]) => {
  return data[id];
};

export const Filters = ({
  data,
  selectedRegion,
  selectedCategory,
  selectedOrder,
  selectedTime,
  onFilterSelected,
}: Props) => {
  return (
    <div className='filter-list'>
      {data.map(({ id, data }) => {
        const selectedData = getSelectedDataById(id, [selectedRegion, selectedCategory, selectedTime, selectedOrder]);
        return (
          <FilterItem
            onFilterSelected={(value) => onFilterSelected(id, value)}
            key={id}
            selectedItem={selectedData}
            data={data}
          />
        );
      })}
    </div>
  );
};
