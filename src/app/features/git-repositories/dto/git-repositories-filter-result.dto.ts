
export class GitRepositoriesFilterResultDto {
	public username!: string | null;
	public repoName!: string | null;

	public static getDefaultDto(): GitRepositoriesFilterResultDto {
		const defaultDto: GitRepositoriesFilterResultDto = new GitRepositoriesFilterResultDto();
		defaultDto.username = 'oshuej';
		defaultDto.repoName = 'web';
		return defaultDto;
	}
}
