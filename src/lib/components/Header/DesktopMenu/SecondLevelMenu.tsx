import React, { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';

import ThirdLevelMenu from 'src/lib/components/Header/DesktopMenu/ThirdLevelMenu';
import { Link } from 'src/lib/drivers';
import { TCategoryTree } from 'src/lib/types/graphql/Category';
import filterOutNullableValues from 'src/peregrine/lib/util/adeoweb/filterOutNullableValues';

interface ISecondLevelMenuProps {
    menuChildren: TCategoryTree[];
    isActive: boolean;
}

const SecondLevelMenu: FunctionComponent<ISecondLevelMenuProps> = ({
    menuChildren,
    isActive
}) => {
    const showMenu = isActive ? 'block' : 'none';

    return (
        <Col className="megamenu" style={{ display: showMenu }}>
            <Row className="row">
                <Col lg={8}>
                    <Row>
                        {menuChildren.map(
                            (
                                {
                                    name,
                                    url_path: urlPath,
                                    children: thirdLevelMenuChildren
                                },
                                index
                            ) => {
                                const itemKey = `${name}-${index}`;
                                const thirdLevelChildren =
                                    filterOutNullableValues(
                                        thirdLevelMenuChildren
                                    );

                                if (!name || !urlPath) {
                                    return null;
                                }

                                return (
                                    <Col key={itemKey} lg={4}>
                                        <div className="menu-title">
                                            <Link to={urlPath}>{name}</Link>
                                        </div>
                                        <ThirdLevelMenu
                                            menuChildren={thirdLevelChildren}
                                        />
                                    </Col>
                                );
                            }
                        )}
                    </Row>
                </Col>
            </Row>
        </Col>
    );
};

export default SecondLevelMenu;
