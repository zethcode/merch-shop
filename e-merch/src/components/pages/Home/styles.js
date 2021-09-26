import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        height: '100vh',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    header: {
        // height: '100vh'
    },
    headerContainer: {
        height: '100vh',
        overflow: 'hidden',
        color: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-around',
        display: 'flex'
    },
    darkBG: {
        backgroundColor: 'rgba(0, 0, 0, 0.17)'
    },
    headerTitle: {
        fontFamily: 'Podkova',
        fontSize: "8rem",
        [theme.breakpoints.down("lg")]: {
            fontSize: "8rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "5rem"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "4rem"
        }
    },
    headerTitle2: {
        fontSize: "5rem",
        [theme.breakpoints.down("lg")]: {
            fontSize: "5rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "2.5rem"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "2rem"
        }
    },
    headerSubtitle: {
        fontSize: "1.5rem",
        [theme.breakpoints.down("lg")]: {
            fontSize: "1.5rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1rem"
        }
    },
    about: {
        height: '40em',
        textAlign: 'center',
        overflow: 'hidden',
        padding: '5em',
        backgroundColor: 'rgb(225,220,220)',
        background: 'linear-gradient(180deg, rgba(225,220,220,1) 0%, rgba(255,255,255,1) 46%)',
        [theme.breakpoints.down("lg")]: {
            padding: '5em'
        },
        [theme.breakpoints.down("md")]: {
            height: '35em',
            padding: '4em'
        },
        [theme.breakpoints.down("sm")]: {
            height: '26.5em',
            padding: '1em'
        },
        [theme.breakpoints.down("xs")]: {
            height: '27em',
            padding: '2em'
        }
    },
    aboutTitle: {
        fontSize: "3rem",
        [theme.breakpoints.down("lg")]: {
            fontSize: "3rem"
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "2.5rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.8rem"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem"
        }
    },
    aboutSubtitle: {
        fontSize: "1.5rem",
        [theme.breakpoints.down("lg")]: {
            fontSize: "1.3rem"
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "1rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1rem"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.8rem"
        }
    },
    aboutSubtitle2: {
        fontSize: "1rem",
        [theme.breakpoints.down("lg")]: {
            fontSize: "1rem"
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "0.7rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.7rem"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.5rem"
        }
    },
    products: {
        height: '68em',
        overflow: 'hidden',
        backgroundColor: '#171717'
    },
    productsTitle: {
        marginTop: '1em',
        fontSize: '3rem',
        color: 'white',
        [theme.breakpoints.down("lg")]: {
            fontSize: '3rem'
        },
        [theme.breakpoints.down("md")]: {
            fontSize: '2.5rem'
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '2rem'
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '1.5rem'
        }
    },
    productsContainer: {
        flex: 1,
        maxHeight: '68em',
        height: '100%',
        color: '#fff',
        paddingTop: '2em',
        paddingBottom: '5em',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.7)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.9)',
            borderRadius: '30px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '30px'
        },
    },
    productsList: {
        height: '100%',
        marginBottom: '3em',
    },
    productItems: {
        height: '100%',
    },
    reviewTitle: {
        fontSize: '3rem',
        [theme.breakpoints.down("lg")]: {
            fontSize: '3rem'
        },
        [theme.breakpoints.down("md")]: {
            fontSize: '2.5rem'
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: '2rem'
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '1.5rem'
        }
    },
    reviews: {
        height: '100%',
        textAlign: 'center',
        overflow: 'hidden',
        paddingTop: '3em',
        paddingLeft: '1.5em',
        paddingRight: '1.5em',
        paddingBottom: '3em',
        backgroundColor: 'rgb(225,220,220)',
        background: 'linear-gradient(180deg, rgba(225,220,220,1) 0%, rgba(255,255,255,1) 46%)',
        [theme.breakpoints.down("lg")]: {
            paddingTop: '3em',
            paddingBottom: '3em',
        },
        [theme.breakpoints.down("md")]: {
            paddingTop: '1.5em',
            paddingBottom: '1.5em',
        }
    },
    reviewQuote: {
        fontSize: '2rem',
        [theme.breakpoints.down("lg")]: {
            fontSize: "1.9rem"
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "1.6rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.4rem"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.3rem"
        }
    },
    reviewer: {
        fontSize: '1.3rem',
        [theme.breakpoints.down("lg")]: {
            fontSize: "1.2rem"
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "1rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.9rem"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.8rem"
        }
    },
    reviewSubtitle: {
        fontSize: "1.2rem",
        [theme.breakpoints.down("lg")]: {
            fontSize: "1.2rem"
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "1rem"
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1rem"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.8rem"
        }
    },
}));