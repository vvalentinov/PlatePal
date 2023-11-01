import Button from 'react-bootstrap/Button';

const BlockButton = ({
    text,
    className,
    type,
    onClick,
}) => {
    return (
        <div className={`d-grid ${className}`}>
            <Button onClick={onClick} type={type} size="lg">
                {text}
            </Button>
        </div>
    );
}

export default BlockButton;