export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die" style={styles} onClick={() => props.holdDice(props.id)}>
            <h1 className="die--number">{props.value}</h1>
        </div>
    )
}