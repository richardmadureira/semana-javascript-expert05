import { describe, test, expect, jest } from '@jest/globals';
import fs from 'fs';
import FileHelper from '../../src/fileHelper';
describe('#FileHelper', () => {
    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 66305,
                mode: 33188,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: 12190888,
                size: 197695007,
                blocks: 386136,
                atimeMs: 1630966774960.714,
                mtimeMs: 1630793012000,
                ctimeMs: 1630966774120.7146,
                birthtimeMs: 1630966773960.7148,
                atime: '2021-09-06T22:19:34.961Z',
                mtime: '2021-09-04T22:03:32.000Z',
                ctime: '2021-09-06T22:19:34.121Z',
                birthtime: '2021-09-06T22:19:33.961Z'
            };

            const mockUser = 'richard';
            process.env.USER = mockUser;
            const filename = 'arquivo.png';

            jest.spyOn(fs.promises, fs.promises.readdir.name).mockResolvedValue([filename]);
            jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock);



            const result = await FileHelper.getFilesStatus("/tmp");


            const expectedResult = [
                {
                    size: "198 MB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ];

            
            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
            expect(result).toMatchObject(expectedResult);
        });
    });
});