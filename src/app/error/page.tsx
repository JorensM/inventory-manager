export default function ErrorPage({searchParams: { message }}: { searchParams: { message: string}}) {
    return <p>{message || 'Sorry, something went wrong'}</p>;
}