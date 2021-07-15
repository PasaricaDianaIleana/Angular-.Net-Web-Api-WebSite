using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantDataAccess.Migrations
{
    public partial class Newcolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SoldNr",
                table: "Menu",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoldNr",
                table: "Menu");
        }
    }
}
