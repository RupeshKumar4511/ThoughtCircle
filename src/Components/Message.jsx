import styles from './Message.module.css';
export default function Message(){
    return(
        <div className={`${styles.message}`}>
        <h2>There are no Post</h2>
        </div>
    );
}