import { nanoid } from 'nanoid';
import { TypeKind, DB } from './types';
import { persisted } from 'svelte-local-storage-store';

//

// Types IDs
const booleanId = nanoid();
const dateId = nanoid();
const numberId = nanoid();
const stringId = nanoid();

const courseTypeId = nanoid();
const projectTypeId = nanoid();

// Attributes IDs
const nameId = nanoid();
const activeId = nanoid();
const freeId = nanoid();

// Objects IDs
const courseId = nanoid();

//

export const db = persisted<DB>('db', new DB());

// const testDB: DB = {
// 	types: {
// 		[booleanId]: { name: 'boolean', kind: TypeKind.PRIMITIVE, constructor: Boolean },
// 		[dateId]: { name: 'date', kind: TypeKind.PRIMITIVE, constructor: Date },
// 		[numberId]: { name: 'number', kind: TypeKind.PRIMITIVE, constructor: Number },
// 		[stringId]: { name: 'string', kind: TypeKind.PRIMITIVE, constructor: String },
// 		[courseTypeId]: {
// 			name: 'course',
// 			kind: TypeKind.COMPOSITE,
// 			attributes: [nameId, activeId, freeId]
// 		},
// 		[projectTypeId]: { name: 'project', kind: TypeKind.COMPOSITE, attributes: [nameId, activeId] }
// 	},
// 	attributes: {
// 		[nameId]: {
// 			name: 'name',
// 			typeId: stringId
// 		},
// 		[activeId]: {
// 			name: 'active',
// 			typeId: booleanId
// 		},
// 		[freeId]: {
// 			name: 'free',
// 			typeId: booleanId
// 		}
// 	},
// 	ducks: {
// 		[courseId]: {
// 			attributes: {
// 				[nameId]: 'Course test',
// 				[activeId]: true,
// 				[freeId]: false
// 			}
// 		}
// 	}
// };
