import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOriginalUrl } from "../../store/url-actions";

export default function RedirectPage() {
    const { uniqueID } = useParams();
    const dispatch = useDispatch();
    const shortenedLink = useSelector(state => state.url.shortenedLink);

    useEffect(() => {
        const fetchAndRedirect = async () => {
            try {
                dispatch(fetchOriginalUrl(uniqueID));
            } catch (error) {
                console.error('Unable to fetch original url', error);
            }
        }

        fetchAndRedirect();
    }, [dispatch, uniqueID])

    useEffect(() => {
        if (shortenedLink) {
            window.location.href = shortenedLink;
        }
    }, [shortenedLink]);

    return null;
}