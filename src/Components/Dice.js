
export default function Dice(props) {
    return (
        <div onClick={(e) => props.onClick(e, props.id)} className={`dice ${props.isHeld && 'dice-selected'}`}>
            <h1>{props.value}</h1>
        </div>
    )
}