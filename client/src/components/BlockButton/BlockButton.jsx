import Button from 'react-bootstrap/Button';

const BlockButton = ({
    text,
    className,
    type,
    onClick,
    bsPrefix,
}) => {
    return (
        <div className={`d-grid`}>
            <Button
                className={className}
                bsPrefix={bsPrefix}
                onClick={onClick}
                type={type}
                size="lg">
                {text}
            </Button>
        </div>
    );
}

export default BlockButton;