import React from "react";

interface BillExtrasProps {
  setTip: (tip: number) => void;
  setTax: (tax: number) => void;
  subtotal: number;
  total: number;
  tip: number;
  tax: number;
}

export default function BillExtras({
  setTip,
  setTax,
  subtotal,
  total,
  tip,
  tax,
}: BillExtrasProps) {
  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.includes(".")) {
      const [, decimal] = value.split(".");
      if (decimal && decimal.length > 2) {
        value = parseFloat(value).toFixed(2);
      }
    }
    setTip(Number(value));
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.includes(".")) {
      const [, decimal] = value.split(".");
      if (decimal && decimal.length > 2) {
        value = parseFloat(value).toFixed(2);
      }
    }
    setTax(Number(value));
  };

  return (
    <>
      <div className="item-input-container">
        <div className="item-input tip-input-wrapper">
          <label htmlFor="tip">
            Tip <span className="required-field-label">*</span>
          </label>
          <div className="tip-input">
            <input
              onChange={handleTipChange}
              className="item-input-textfield"
              type="number"
              placeholder="0.00"
              step="0.01"
              id="tip"
              value={tip || ""}
            />
          </div>
        </div>
        <div className="item-input tax-input-wrapper">
          <label htmlFor="tax">
            Tax <span className="required-field-label">*</span>
          </label>
          <div className="tax-input">
            <input
              onChange={handleTaxChange}
              className="item-input-textfield"
              type="number"
              placeholder="0.00"
              step="0.01"
              id="tax"
              value={tax || ""}
            />
          </div>
        </div>
      </div>
      <div className="item-input-container">
        <div className="item-input tip-input-wrapper">
          <label htmlFor="subtotal">Subtotal</label>
          <div className="tip-input">
            <input
              className="item-input-textfield"
              type="number"
              placeholder="0.00"
              disabled
              value={subtotal.toFixed(2)}
              id="subtotal"
            />
          </div>
        </div>
        <div className="item-input tax-input-wrapper">
          <label htmlFor="total">Total</label>
          <div className="tax-input">
            <input
              className="item-input-textfield"
              type="number"
              disabled
              placeholder="0.00"
              id="total"
              value={total.toFixed(2)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
