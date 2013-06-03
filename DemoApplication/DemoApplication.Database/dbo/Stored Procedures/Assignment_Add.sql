﻿-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_Add 
	@Id int,
	@Name varchar(50),
	@Description varchar(500),
	
	@Status tinyint,
	@DueDate datetime,
	@CompletedDate datetime,
	
	@PrincipalIsTeam bit,
	@ResolvedByOne bit,
	@PrincipalId CHAR(30),
	@ApproverId CHAR(30),
	@EmployeeId CHAR (30),

	@RequiresSignature BIT,
    @Recurring BIT,

	@TaskId int,
	@CategoryId int
AS BEGIN
	insert into Assignment 
		([Name], 
		 [Description], 
		
		 [DueDate],

		 [PrincipalIsTeam],  
		 [ResolvedByOne],
 		 [Principal_Cd],
		 [Approver_Cd],
		 [Employee_Cd],

		 [RequiresSignature],
		 [Recurring],

		 [TaskId],
		 [CategoryId])
	values 
		(@Name,  
		 @Description,  
		
		 @DueDate,
				 
		 @PrincipalIsTeam, 
		 @ResolvedByOne, 
		 @PrincipalId, 
		 @ApproverId,
		 @EmployeeId,

		 @RequiresSignature,
		 @Recurring,

		 @TaskId,
		 @CategoryId)

	SELECT SCOPE_IDENTITY()
END