import { makeStyles} from "@material-ui/styles";

export const useStyles = makeStyles({
    red: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 31,
        padding: '0 10px',
        margin: 8,
    },
    blue: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 31,
        padding: '0 10px',
        margin: 3,
    },
    smallBtn: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height:  34,
        minWidth: 11,
        padding: '0 10px',
        margin: '1px 15px',
    },
    removeTask: {
        padding: 6,
        borderRadius: '50%',
        minWidth: 40,
    }

});



