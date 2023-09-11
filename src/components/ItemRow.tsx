import React from "react";

interface ItemRowProps {
  index: number;
  handleOnBlur: (arg1: "name" | "cost", arg2: string, arg3: number) => void;
  handleMoneyInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ItemRow({
  index,
  handleOnBlur,
  handleMoneyInputChange,
}: ItemRowProps) {

  return (
    <div className="item-input-container">
      <div className="item-input name-input">
        <label htmlFor={`name-${index}`}>
          Item {index + 1}{" "}
          {index === 0 && (
            <span className="required-field-label">
              *
            </span>
          )}
        </label>
        <input
          onBlur={(e) => handleOnBlur("name", e.target.value, index)}
          className="item-input-textfield"
          id={`name-${index}`}
        />
      </div>
      <div className="item-input cost-input-wrapper">
        <label htmlFor={`cost-${index}`}>
          Cost of Item {index + 1}{" "}
          {index === 0 && (
            <span className="required-field-label">
              *
            </span>
          )}
        </label>
        <div className="cost-input">
          <input
            onBlur={(e) => handleOnBlur("cost", e.target.value, index)}
            onChange={handleMoneyInputChange}
            className="item-input-textfield"
            type="number"
            placeholder="0.00"
            step="0.01"
            id={`cost-${index}`}
          />
        </div>
      </div>
    </div>
  );
}
