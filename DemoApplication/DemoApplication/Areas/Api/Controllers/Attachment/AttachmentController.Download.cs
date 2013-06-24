﻿namespace DemoApplication.Areas.Api.Controllers
{
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using Models;
    using System.Collections.Generic;
    using System.Data;
    using Infrastructure.Data;

    public partial class AttachmentController
    {
        public IEnumerable<FilesStatus> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<FilesStatus>("Attachment_GetAll", commandType: CommandType.StoredProcedure);
            }
        }

        public HttpResponseMessage Get(int id)
        {
            dynamic result;
            using (var db = new DapperDatabase())
            {
                result = db.Connection.Query("Attachment_GetById",
                                             new { Id = id },
                                             commandType: CommandType.StoredProcedure)
                                      .SingleOrDefault();
            }

            if (result == null) return Request.CreateErrorResponse(HttpStatusCode.NotFound, "");

            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new ByteArrayContent(result.Content);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(result.MimeType);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = result.Name
            };

            return response;
        }
    }
}