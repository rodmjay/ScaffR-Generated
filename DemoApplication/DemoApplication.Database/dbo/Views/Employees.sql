﻿CREATE VIEW [dbo].[Employees]
	AS SELECT 
	Employee_Cd as 'Id',
	First_Name_Txt as 'FirstName',
	Last_Name_Txt as 'LastName',
	'Sample Title' as 'Title',
	'dummy@sample.com' as 'Email'
	 FROM [Person_Main]