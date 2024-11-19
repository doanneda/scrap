import threadImage from './assets/thread.png';
import { Link } from 'react-router-dom';

export default function Feed() {
    return (
    <div className="feed" alt="brown thread">
        <img src={threadImage} />
        <div>
            test
        </div>

        <Link to="login">
            <button>Login</button>
        </Link>
    </div>
    )
}