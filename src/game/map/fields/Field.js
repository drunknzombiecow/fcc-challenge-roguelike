// @flow
import uuid from 'uuid';

import type { FieldTypeCode } from './FieldTypes';
import type { Point } from '../../../types/BasicTypes';

type FieldProperties = {
    x: number,
    y: number,
    type: FieldTypeCode,
    image?: string,
    id?: string
};

export default class Field {
    getPosition: Function;
    getType: Function;
    setType: Function;
    getImage: Function;
    setImage: Function;
    getId: Function;
    getState: Function;
    isOccupiedBy: Function;
    constructor(params: FieldProperties) {
        const { x, y, type, image } = params;
        const id = uuid.v4();

        function getPosition(): Point {
            return Object.freeze({ x, y });
        }

        function getType(): FieldTypeCode {
            return type;
        }

        function setType(newType: FieldTypeCode): Field {
            return new Field({ x, y, image, type: newType });
        }

        function getId(): string {
            return id;
        }

        function getImage(): ?string {
            return image;
        }

        function setImage(newImage: string): Field {
            return new Field({ x, y, type, id, image: newImage });
        }

        function getState(): FieldProperties {
            return Object.freeze({ x, y, type, id, image });
        }

        function isOccupiedBy(testType: FieldTypeCode): boolean {
            return (type === testType);
        }

        this.getPosition = getPosition;
        this.getId = getId;
        this.getState = getState;
        this.getType = getType;
        this.setType = setType;
        this.getImage = getImage;
        this.setImage = setImage;
        this.isOccupiedBy = isOccupiedBy;
        Object.freeze(this);
    }
}
