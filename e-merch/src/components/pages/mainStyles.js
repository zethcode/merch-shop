import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));