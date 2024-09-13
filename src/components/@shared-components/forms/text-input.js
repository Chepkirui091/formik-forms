import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {alpha, FormControl, InputBase, InputLabel} from "@mui/material";

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.grey["500"],
        overflow: 'hidden',
        borderRadius: 4,
        fontSize:'14px',
        fontWeight: 'bold',
        backgroundColor: `${alpha(theme.palette.primary.main, 0.02)}`,
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: `${alpha(theme.palette.primary.main, 0.1)}`,
        },
        '&.Mui-focused': {
            backgroundColor: `${alpha(theme.palette.primary.main, 0.1)}`,
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}));


const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),

    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


const TextInput = props => {
    const { name = "default", label = "", defaultInput= true, ...other  } = props;

    if (defaultInput){
        return(
            <>
                <RedditTextField variant="filled" name={name} label={label} {...other}/>
            </>
        )
    }

    return (
        <FormControl variant="standard">
            <InputLabel shrink htmlFor={name}>
                {label}
            </InputLabel>
            <BootstrapInput {...other}/>
        </FormControl>
    )

}

export default TextInput;