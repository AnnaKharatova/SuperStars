import "./MyTooltip.scss";

interface IProps {
  showTooltip: boolean;
  text: string;
  top?: number;
  width?: string;
}

function MyTooltip({ showTooltip, text, top, width }: IProps) {
  return (
    <div className="tooltip-container" style={{ top: top, width: width }}>
      {showTooltip && (
        <div className="tooltip">
          <div className="tooltip-arrow" />
          <div className="tooltip-text">{text}</div>
        </div>
      )}
    </div>
  );
}

export default MyTooltip;
