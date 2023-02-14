import React from 'react';
import './styles.css';
interface Props {
  data: string[];
  selectedItem: string;
  onFilterSelected: (value: string) => void;
}
export const FilterItem = ({ data, selectedItem, onFilterSelected }: Props) => {
  return (
    <div className="filter-item">
      {data.map((item, index: number) => {
        return (
          <span
            key={index}
            onClick={() => onFilterSelected(item)}
            className={selectedItem === item ? 'filter-item_text filter-item_text_active' : 'filter-item_text'}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};
