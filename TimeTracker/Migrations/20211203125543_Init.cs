using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeTracker.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreateDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProjectId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TaskComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TaskId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskComments_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_TaskComments_TaskId",
                table: "TaskComments",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ProjectId",
                table: "Tasks",
                column: "ProjectId");

            SeedData(migrationBuilder);
        }

        private void SeedData(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "INSERT INTO `projects` VALUES ('08d9b653-edd8-490e-8bc3-3e1c08dacc34','Банк','2021-12-03 16:56:23.785852','0001-01-01 00:00:00.000000'),('08d9b653-f217-4925-8629-ca27471b97a6','Блог','2021-12-03 16:56:30.980132','0001-01-01 00:00:00.000000');" +
                "INSERT INTO `tasks` VALUES ('08d9b656-8ff6-49b9-8f81-f411c6c1b8a8','Поменять изображения на главной странице','08d9b653-f217-4925-8629-ca27471b97a6','2021-12-03 17:14:00.000000','2021-12-03 17:18:00.000000','0001-01-01 00:00:00.000000','2021-12-03 17:17:01.172328'),('08d9b656-ee0f-481e-82f4-4482c281205a','Добавить комментарии','08d9b653-f217-4925-8629-ca27471b97a6','2021-12-01 17:17:00.000000','2021-12-02 17:17:00.000000','2021-12-03 17:17:52.706774','0001-01-01 00:00:00.000000'),('08d9b657-05d0-4623-8654-c9c73e98ae99','Поменять изображения на главной странице','08d9b653-f217-4925-8629-ca27471b97a6','2021-12-03 17:18:00.000000','1970-01-01 00:00:00.000000','2021-12-03 17:18:32.558400','0001-01-01 00:00:00.000000'),('08d9b657-2e07-4616-851e-c3dff5b77a88','Перекрасить кнопку','08d9b653-edd8-490e-8bc3-3e1c08dacc34','2021-12-03 17:18:00.000000','2021-12-03 17:23:00.000000','2021-12-03 17:19:40.027718','0001-01-01 00:00:00.000000'),('08d9b657-4b05-4f17-8590-aa50b7cd56b2','Убрать дублирование транзакций','08d9b653-edd8-490e-8bc3-3e1c08dacc34','2021-12-01 17:20:00.000000','2021-12-03 22:20:00.000000','0001-01-01 00:00:00.000000','2021-12-03 17:20:49.631336');" +
                "INSERT INTO `taskcomments` VALUES ('08d9b656-9003-40a7-8bbc-981e75a723fb','08d9b656-8ff6-49b9-8f81-f411c6c1b8a8',0,'Делайте хорошо, а плохо не делайте. Пока'),('08d9b656-cf57-4ff7-89b8-a9c2d3f2374a','08d9b656-8ff6-49b9-8f81-f411c6c1b8a8',1,'OIP (1).jpg'),('08d9b656-cf58-4034-8676-c8278de86fa8','08d9b656-8ff6-49b9-8f81-f411c6c1b8a8',1,'OIP (2).jpg'),('08d9b656-cf58-405c-85e0-4f50a0f4c58b','08d9b656-8ff6-49b9-8f81-f411c6c1b8a8',1,'OIP (3).jpg'),('08d9b656-cf58-4080-8b4d-67e591063dc2','08d9b656-8ff6-49b9-8f81-f411c6c1b8a8',1,'OIP.jpg'),('08d9b656-ee0f-48a3-8846-53530ca0d652','08d9b656-ee0f-481e-82f4-4482c281205a',1,'OIP (4).jpg'),('08d9b657-05d0-47c4-8cca-a778c619a8e8','08d9b657-05d0-4623-8654-c9c73e98ae99',1,'download.jpg'),('08d9b657-05d0-484a-852e-1200640dd0bd','08d9b657-05d0-4623-8654-c9c73e98ae99',1,'OIP (1).jpg'),('08d9b657-2e07-4711-87a0-60482a3ce1f9','08d9b657-2e07-4616-851e-c3dff5b77a88',0,'В зеленый');"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskComments");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
