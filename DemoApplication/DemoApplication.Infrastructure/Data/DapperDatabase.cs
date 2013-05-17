namespace DemoApplication.Infrastructure.Data
{
    using System;
    using System.Configuration;
    using System.Data.Common;
    using System.Data.SqlClient;

    public class DapperDatabase : IDisposable
    {
        private readonly DbConnection connection;

        public DapperDatabase()
        {
            connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Onboarding"].ConnectionString);
            Connection.Open();
        }

        public DbConnection Connection
        {
            get { return connection; }
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
