import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head/>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
                <script type="text/javascript" src="/js/app.js"></script>
                <script type="text/javascript" src="/js/functions.js"></script>
            </Html>
        )
    }

}

export default MyDocument;