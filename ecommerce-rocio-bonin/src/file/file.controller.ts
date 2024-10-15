import { Controller, FileTypeValidator, HttpCode, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileRespository } from "./file.repository";
import { AuthGuard } from "../Auth/authGuard/auth.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";

@ApiTags('Files')
@Controller('files')
export class FileController {
    constructor( private readonly fileRepository: FileRespository ) {}

    @ApiBearerAuth()
    @Post('uploadImage/:id') 
    @HttpCode(200)
    @ApiConsumes('multipart/form-data')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: { 
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    async uploadImage(
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 204800,
                        message: 'El archivo debe ser menor a 200kb'
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/,
                    }),
                ]
            })
        ) file: Express.Multer.File
     ) {
            console.log('Received file:', file);
            if (!file) {
                throw new Error('No file uploaded.');
              }
            return await this.fileRepository.uploadAndUpdateImage(id, file);
    }
}