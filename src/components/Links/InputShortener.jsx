import classes from './InputShortener.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setInputValue } from '../../store/url-slice';
import { storeUrl } from '../../store/url-actions';

export default function InputShortener() {
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.url.inputValue);

    const handleClick = () => {
        if (inputValue.trim()) {
            dispatch(storeUrl(inputValue));
            dispatch(setInputValue(''));
        }
    }
    return (
        <div className={classes.inputContainer}>
            <h1>
                URL <span>Shortener</span>
                <div>
                    <input
                        type='text'
                        placeholder='Enter a link'
                        value={inputValue}
                        onChange={(e) => dispatch(setInputValue(e.target.value))}
                    />
                    <button onClick={handleClick}>Shorten</button>
                </div>
            </h1>
        </div>
    )
}