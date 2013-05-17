namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Core.Model;
    using Infrastructure.Data;

    public class EmployeeController : ApiController
    {
        public IEnumerable<Employee> Employees()
        {
            using (var db = new DapperDatabase())
            {
                var employees = db.Connection.QueryMultiple("[dbo].[Employee_Tasks]", new { Company_Cd = '1' }, commandType: CommandType.StoredProcedure).
                    Map<Employee, Assignment, string>(
                                                    employee => employee.EmployeeCode,
                                                    assignment => assignment.EmployeeCode,
                                                    (employee, assignments) =>
                                                    { employee.AssignmentsAbout = assignments; }
                                                 ).ToList();
                return employees;
            }
        }
    }
}