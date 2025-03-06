import classes from './Satellite.module.css'

function SatelliteDetail(props) {
    return (
        <section className={classes.detail}>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}

export default SatelliteDetail


/*<section className={classes.detail}>
            <img src={props.image} alt={props.title} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>*/