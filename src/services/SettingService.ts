import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingRepository } from "../repositories/SettingRepository"


interface ISettingCreate {
    chat: boolean
    username: string
}


class SettingService {
    private settingRepository: Repository<Setting>

    constructor() {
        this.settingRepository = getCustomRepository(SettingRepository)
    }
    async create({ chat, username }: ISettingCreate): Promise<Setting> {
        const userAlreayExists = await this.settingRepository.findOne({
            username
        })
        if (userAlreayExists) {
            throw new Error("User already exists!")
        }
        const setting = this.settingRepository.create({
            chat,
            username
        })
        await this.settingRepository.save(setting)
        return setting
    }

    async findByUsername(username: string) {
        const setting = await this.settingRepository.findOne({
            username
        })
        return setting
    }

    async update(username: string, chat: boolean) {
        await this.settingRepository.createQueryBuilder()
        .update(Setting)
        .set({ chat })
        .where("username = :username", {
            username
        })
        .execute()
    }
}

export { SettingService }