import React from 'react';
import { Container, Menu, Header as SemanticHeader } from 'semantic-ui-react';

const Header = () => (
    <Menu stackable inverted>
        <Container>
            <Menu.Item header>
                <a href="/">
                    <SemanticHeader as="h1" style={{ margin: '0' }}>
                        Quizzard
                    </SemanticHeader>
                </a>
            </Menu.Item>
        </Container>
    </Menu>
);

export default Header;
