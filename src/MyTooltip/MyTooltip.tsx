import './MyTooltip.scss'

interface IProps {
    showTooltip: boolean;
}

function MyTooltip({showTooltip} : IProps) {

    return (
        <div
            className="tooltip-container"
        >
            {showTooltip && (
                <div className="tooltip">
                    <div className="tooltip-arrow" />
                    <div className="tooltip-text">График можно детализировать по любой из компетенций при клике на соответствующую линию компетенции или её название в легенде</div>
                </div>
            )}
        </div>
    );
};

export default MyTooltip