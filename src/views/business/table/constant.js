export const defaulTableColumn = Object.freeze([
	{
		prop: 'name',
		label: 'Name'
	},
	{
		prop: 'position',
		label: 'Position'
	},
	{
		prop: 'office',
		label: 'Office'
	},
	{
		prop: 'age',
		label: 'Age'
	},
	{
		prop: 'start-date',
		label: 'Start date'
	},
	{
		prop: 'salary',
		label: 'Salary'
	}
])

export const complexTableColumn = Object.freeze([
	{
		prop: 'name',
		label: 'Name'
	},
	{
		prop: 'position',
		label: 'Position',
		slots: true
	},
	{
		prop: 'office',
		label: 'office',
		slots: true
	},
	{
		prop: 'age',
		label: 'Age',
		slots: true
	},
	{
		prop: 'start-date',
		label: 'Start date',
		slots: true
	},
	{
		prop: 'salary',
		label: 'Salary'
	}
])
