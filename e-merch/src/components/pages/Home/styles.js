import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: "100vh",
        height: "100vh",
        // backgroundColor: blue,
    },
    header: {
        textAlign: 'center',
        height: '100vh',
        width: '100%', //'135.95em',
        alignItems: 'center',
        // height: '100em',
        // width: '135.95em',
    },
    headerTitle: {
        fontFamily: 'Podkova'
    },
    headerContainer: {
        marginTop: '7em'
        // justifyContent: 'center',
        // alignItems: 'center',
        // direction: 'row',
    },
    headerImage: {
        height: '800px',
        width: '1000px',
        // height: "1080px",
        // width: "1920px",
        // backgroundImage: `url(${headerImage})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "1920px 1080px",
        // backgroundAttachment: "fixed",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));