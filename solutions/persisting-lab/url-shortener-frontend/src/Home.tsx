import React, { useState } from 'react';
import { Form, Text, TextVariants, TextContent, Button, FormGroup } from '@patternfly/react-core';
import { TextArea } from '@patternfly/react-core';
import './Home.css';

function Home() {
    const [url, setURL] = useState("");
    const [shortUrl, setShortURL] = useState("");

    const onUrlChange = (event: string) => setURL(event)

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        };
        fetch("/api/longurl", requestOptions)
            .then(response => response.json())
            .then(res => setShortURL(res.message));
    };

    return (
        <div className='Home'>
            <Form >
                <FormGroup fieldId="horizontal-form-url">
                    <TextContent>
                        <Text component={TextVariants.h4}>Enter the URL to shorten</Text>
                    </TextContent>
                    <TextArea type="text" value={url} onChange={onUrlChange} required />
                </FormGroup>
                <Button variant="primary" type="submit" onClick={handleSubmit} > Submit </Button>
            </Form>
            {
                shortUrl !== "" && <TextContent className="link-text-area">
                    <Text component={TextVariants.h5}>Shortened Link</Text>
                    <Text component={TextVariants.h5}>{shortUrl}</Text>
                </TextContent>
            }
        </div>
    )
}

export default Home