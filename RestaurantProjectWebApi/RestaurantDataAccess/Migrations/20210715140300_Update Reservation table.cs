using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantDataAccess.Migrations
{
    public partial class UpdateReservationtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Reservations",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Reservations",
                newName: "Hour");

            migrationBuilder.RenameColumn(
                name: "Message",
                table: "Reservations",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Reservations",
                newName: "ReservationId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Reservations",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UserId",
                table: "Reservations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_AspNetUsers_UserId",
                table: "Reservations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_AspNetUsers_UserId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_UserId",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Reservations",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Hour",
                table: "Reservations",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Reservations",
                newName: "Message");

            migrationBuilder.RenameColumn(
                name: "ReservationId",
                table: "Reservations",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Type",
                table: "Reservations",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Reservations",
                nullable: true);
        }
    }
}
