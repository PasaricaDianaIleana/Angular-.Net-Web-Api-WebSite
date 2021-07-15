using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantDataAccess.Migrations
{
    public partial class Tablesfk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Review",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Review_Id",
                table: "Review",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Menu_Id",
                table: "Review",
                column: "Id",
                principalTable: "Menu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Review_Menu_Id",
                table: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Review_Id",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Review");
        }
    }
}
