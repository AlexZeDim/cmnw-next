import fetch from 'isomorphic-unfetch'
import {Container, Typography} from "@material-ui/core";
import React from "react";

function HomePage({ price, name }) {
    return (
        <Container fixed>
            <Typography variant="overline" display="block">
                {price}
            </Typography>
            <Typography variant="h2" gutterBottom>
                EU:{name}
            </Typography>
            <Typography variant="caption" display="block">
                "timestamp"
            </Typography>
        </Container>
    )
}

HomePage.getInitialProps = async ({ req }) => {
    const res = await fetch('https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu&locale=en_GB&access_token=EURlzC5eK2swqSoQhY2J57J4C56JueslSt')
    const json = await res.json();
    return { price: json.price/10000, name: 'WoWToken' }
};

export default HomePage