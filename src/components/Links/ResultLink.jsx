import { useEffect } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard";
import classes from "./ResultLink.module.css"
import { useDispatch, useSelector } from "react-redux";
import { setCopied } from "../../store/url-slice";

export default function ResultLink() {
    const dispatch = useDispatch();
    const { shortenedLink, copied } = useSelector(state => state.url);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setCopied(false));
        }, 1000);

        return () => clearTimeout(timer);
    }, [copied, dispatch]);

    return (
        <div className={classes.result}>
            <input type="text" value={shortenedLink} readOnly />
            <CopyToClipboard text={shortenedLink} onCopy={() => dispatch(setCopied(true))}>
                <button className={copied ? classes.copied : classes.button}>Copy</button>
            </CopyToClipboard>
        </div>
    )
}