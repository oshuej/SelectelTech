
export class GitRepositoriesFilterResultDto {
	public username!: string;
	public repoName!: string;

	public static getDefaultDto(): GitRepositoriesFilterResultDto {
		const defaultDto: GitRepositoriesFilterResultDto = new GitRepositoriesFilterResultDto();
		defaultDto.username = 'oshuej';
		defaultDto.repoName = 'web';
		return defaultDto;
	}
}
