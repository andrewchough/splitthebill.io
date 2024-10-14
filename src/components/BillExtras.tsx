import React from "react";

interface BillExtrasProps {
  setTip: (tip: number) => void;
  setTax: (tax: number) => void;
  subtotal: number;
  total: number;
  tip: number;
  tax: number;
  handleMoneyInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BillExtras({
  setTip,
  setTax,
  subtotal,
  total,
  tip,
  tax,
  handleMoneyInputChange,
}: BillExtrasProps) {
  return (
    <>
      <div className="item-input-container">
        <div className="item-input tip-input-wrapper">
          <label htmlFor="tip">
            Tip <span className="required-field-label">*</span>
          </label>
          <div className="tip-input">
            <input
              onBlur={(e) => setTip(Number(e.target.value))}
              onChange={handleMoneyInputChange}
              className="item-input-textfield"
              type="number"
              placeholder="0.00"
              step="0.01"
              id="tip"
              value={tip.toFixed(2)}
            />
          </div>
        </div>
        <div className="item-input tax-input-wrapper">
          <label htmlFor="tax">
            Tax <span className="required-field-label">*</span>
          </label>
          <div className="tax-input">
            <input
              onBlur={(e) => setTax(Number(e.target.value))}
              onChange={handleMoneyInputChange}
              className="item-input-textfield"
              type="number"
              placeholder="0.00"
              step="0.01"
              id="tax"
              value={tax.toFixed(2)}
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
