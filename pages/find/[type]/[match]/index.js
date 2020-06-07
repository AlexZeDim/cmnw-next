import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Link from "../../../../src/Link";
import TableIcons from "../../../../src/TableIcons"
import MaterialTable from 'material-table';
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(6, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    table: {
        minWidth: 650,
    },
    title: {
        color: theme.palette.background.paper,
        fontFamily: 'Fira Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400,
        textTransform: 'uppercase'
    },
    findAllResult: {
        marginTop: theme.spacing(0),
    },
    modal: {
        margin: theme.spacing(30, 60, 30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function CharacterPage({ _id, match }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="lg">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.title} gutterBottom>
                            {_id}
                        </Typography>
                    </Container>
                </div>
                {/* End hero unit */}
                <Container className={classes.cardGrid} maxWidth={false}>
                    <MaterialTable
                        title="Render Image Preview"
                        icons={TableIcons}
                        columns={[
                            { title: 'Avatar', field: 'media', render: ({media}) => <img src={media.avatar_url} style={{width: 50, borderRadius: '50%'}}/> },
                            { title: 'Name', field: 'name' },
                            {
                                field: 'realm',
                                title: 'Realm',
                                render: ({realm}) => realm.name
                            },
                            {
                                field: 'guild',
                                title: 'Guild',
                                render: ({realm, guild}) => <Link href={encodeURI(`/guild/${realm.slug}/${guild.slug}`)} color="secondary" underline="hover">{guild.name}</Link>
                            },
                            { title: 'Class', field: 'character_class' },
                            { title: 'Level', field: 'level' },
                            { title: 'Faction', field: 'faction' },
                            { title: 'Race', field: 'race' },
                            { title: 'Gender', field: 'gender' },
                        ]}
                        data={match}
                        options={{
                            sorting: true,
                            pageSize: 10,
                            pageSizeOptions: [5,10,25,50],
                            showTitle: false,
                        }}
                    />
                </Container>
            </main>
        </React.Fragment>
    )
}

export async function getServerSideProps({query}) {
    const {type, match} = query;
    const res = await fetch(encodeURI(`http://${process.env.api}/find/${type}/${match}`));
    const json = await res.json();
    return { props: json }
}

export default CharacterPage